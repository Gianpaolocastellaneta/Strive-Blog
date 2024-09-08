import express, {json} from 'express';
import Author from '../models/authorSchema.js'
import uploadCloudinary from '../middleware/uploadCloudinary.js';
import { getAuthors, getSingleAuthor, addAuthor, editAuthor, deleteAuthor, patchAuthor, getSingleAuthorPosts } from '../controllers/author.controller.js';


const router = express.Router()

router.get('/', getAuthors)
router.get('/:id',getSingleAuthor)
router.post('/', addAuthor)
router.put ('/:id', editAuthor)
router.delete ('/:id', deleteAuthor)
router.patch('/:authorId/avatar', uploadCloudinary.single('avatar'), patchAuthor)
router.get ('/:id/blogPosts', getSingleAuthorPosts)


export default router

// get per richiamare tutti gli autori
// router.get("/", async (req,res)=>{
//     const page = req.query.page || 1
//     let perPage = req.query.perPage || 3
//     perPage = perPage > 5 ? 5 : perPage
//     try {
//         const allAuthors = await Author.find({})
//         .collation({locale: 'it'}) //serve per ignorare maiuscole e minuscole nell'ordine alfabetico del sort
//         .sort({name:1, surname:1})
//         .skip((page-1)*perPage)
//         .limit(perPage)
//         const totalResults = await Author.countDocuments()// mi da il numero totale di documenti
//         const totalPages = Math.ceil(totalResults / perPage )  
//         // res.send(allAuthors)
//         res.send({
//             dati: allAuthors,
//             totalResults,
//             totalPages,
//             page,

//         })
//     } catch (error) {
//         res.status(404).send({message: 'Not Found'})
//     }
    
// })

// //richiamo un singolo autore con l'id
// router.get("/:id", async (req,res)=>{
//     const {id} =req.params
//     try {
//         const author = await Author.findById(id)
//         res.status(200).send(author) 
//     } catch (error) {
//         res.status(404).send({message: 'Not Found'}) 
//     }
    
// })


// // post per creare un nuovo autore
// router.post("/", async (req,res)=>{
//     const author = new Author (req.body)
//     author.avatar = author.avatar ? author.avatar : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
//     try {
//          //salva i dati prendendoli nel db , prendendoli dall'istanza
//         const newAuthor = await author.save()
//         //invia i dati al database
//         res.status(200).send(newAuthor)
//     } catch (error) {
//         res.status(400).send(error)
//     }

// })

// router.put("/:id", async (req,res)=>{
//     const {id} =req.params
//     try {
//         const author = await Author.findByIdAndUpdate(id, req.body, {new:true}) //new serve per restituire in author l'oggetto appena inserito, altrimenti non lo restituisce
//         await author.save();
//         res.status(200).send(author)
//     } catch (error) {
//         res.status(400).send(error)
//     }
    
// })

// router.delete("/:id", async (req,res)=>{
//     const {id} =req.params
//     try {
//         //se l'id esiste nello schema allora fai la delete
//         if (await Author.exists({_id:id})){
//             await Author.findByIdAndDelete(id)
//             res.status(200).send(`ho eliminato l'autore con id: ${id}`)
//         }else {res.status(404).send({message: `ID ${id} not found`})}
        
//     } catch (error) {
//         res.status(404).send({message: `ID ${id} not found`})
//     }
    
// })


// //inserisco uploadCloudinary per prendere il middleware e lo importo mentre single prendo solo un solo file avatar
// router.patch('/:authorId/avatar', uploadCloudinary.single('avatar'),async (req,res)=>{ //patch per modificare solo un campo o determinati campi
//     const {authorId} =req.params
//     try {
//         const author = await Author.findByIdAndUpdate(authorId, {avatar: req.file.path}, {new:true}) //new serve per restituire in author l'oggetto appena inserito, altrimenti non lo restituisce
//         await author.save();//non necessario
//         res.status(200).send(author)
//     } catch (error) {
//         res.status(400).send(error)
//     }
    
// })


// export default router