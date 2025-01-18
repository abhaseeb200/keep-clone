import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Masonry from "react-responsive-masonry";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { getNotesReducer } from "@/Features/note/noteSlice";
import Card from "@/Components/Card";
import CardModal from "@/Components/CardModal";
import useNotes from "@/Hooks/useNotes";
import useLabels from "@/Hooks/useLabels";
import NoteForm from "@/Components/NoteForm";

function Dashboard() {
    const [sortingItems, setSortingItems] = useState([]); // Used for drag-and-drop
    const [selectedModalNote, setSelectedModalNote] = useState({});
    const [isOpenNote, setIsOpenNote] = useState(false);
    const [currentId, setCurrentId] = useState(null);

    const [selectMultiple, setSelectMultiple, isListView] = useOutletContext();

    const { notes } = useSelector((state) => state?.note);

    const dispatch = useDispatch();

    const { getNotes } = useNotes();
    const { getLabels } = useLabels();

    useEffect(() => {
        async function fetchNotes() {
            await getNotes();
        }
        async function fetchLabels() {
            await getLabels();
        }

        fetchLabels();
        if (!notes?.length) {
            fetchNotes();
        }
    }, []);

    useEffect(() => {
        //Used for the purpose of update current-note data in the modal
        setSelectedModalNote(
            notes.find((note) => note.id == selectedModalNote?.id)
        );

        //Used for the purpose of drag-and-drop items
        setSortingItems(notes.map((note) => note.id));
    }, [notes]);

    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (active.id !== over.id) {
            setSortingItems((prev) => {
                const oldIndex = prev.indexOf(active.id);
                const newIndex = prev.indexOf(over.id);
                const newOrder = arrayMove(prev, oldIndex, newIndex);

                const sortedNotes = newOrder.map((orderId) =>
                    notes.find((note) => note.id === orderId)
                );

                dispatch(getNotesReducer(sortedNotes));
                return newOrder;
            });
        }
    };

    const handleLabelToggle = (data) => {
        setCurrentId((prevId) => (prevId === data.id ? null : data.id));
    };

    return (
        <div className="mt-8">
            {/* ============== INPUT FIELDS ============== */}
            <NoteForm />

            {/* ============== MASONRY NOTES CARDS ============== */}
            <DndContext
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext items={sortingItems}>
                    <div className="flex flex-wrap">
                        <Masonry
                            columnsCount={isListView ? 1 : 5}
                            gutter="18px"
                        >
                            {sortingItems.map((id) => {
                                const note = notes.find(
                                    (note) => note.id === id
                                );
                                return (
                                    <Card
                                        key={note?.id}
                                        data={note}
                                        currentId={currentId}
                                        setCurrentId={setCurrentId}
                                        selectMultiple={selectMultiple}
                                        handleLabelToggle={handleLabelToggle}
                                        setSelectedModalNote={
                                            setSelectedModalNote
                                        }
                                        setIsOpenNote={setIsOpenNote}
                                    />
                                );
                            })}
                        </Masonry>
                    </div>
                </SortableContext>
            </DndContext>

            {/* ============== CARD MODAL ============== */}
            <CardModal
                isOpen={isOpenNote}
                setIsOpenNote={setIsOpenNote}
                data={selectedModalNote}
            />
        </div>
    );
}
export default Dashboard;
