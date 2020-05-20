export const findFolder = (folders=[], folderId) => 
    folders.find(folder => folder.id === folderId)

export const findNote = (notes=[], noteId) => {
    console.log(typeof noteId);
    notes.find(note => note.id.toString() === noteId)
}
    

export const getNotesForFolder = (notes=[], folderId) => (
    (!folderId) ? notes : notes.filter(note => note.folderId.toString() === folderId)
)

export const countNotesForFolder = (notes=[], folderId) => 
    notes.filter(note => note.folderId.toString() === folderId).length