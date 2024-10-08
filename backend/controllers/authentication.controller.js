import Author from '../models/authorSchema.js'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


export const register = async (req,res) =>{
    //verificare che la mail non sia già utilizzata
    const author = await Author.findOne({email: req.body.email});
    //se esiste ritorna errore
    if (author) return res.status(500).send('Email exists')
    // se non è usata allora salviamo il nuovo utente con la password hashata
    const newAuthor = new Author({
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, 10),
        avatar: req.file ? req.file.path : "https://picsum.photos/40",
        verifiedAt: new Date()
    });

    const authorCreated = await newAuthor.save()
    res.send(authorCreated);
}

export const login = async (req,res) => {
    //cercare la mail nel db
    const author = await Author.findOne({email: req.body.email}).select('+password')//la select mi fa prendere tutto più il campo password
    //se non trova la mail
    if(!author) return res.status(401).send('Incorrect Credentials')
    //se trova la mail
    if(!(await bcrypt.compare(req.body.password, author.password))){
        return res.status(401).send('Incorrect Credentials')
    }

    //se la password è corretta allora generare il jwt e lo restituiamo
    jwt.sign(
        {authorId: author.id},
        process.env.JWT_SECRET,
        {
            expiresIn: '1h'
        },
        (err, jwtToken) =>{
            if (err) return res.status(500).send();
            return res.send({
                token: jwtToken
            })
        }
    )
}

export const me = async(req,res) =>{
    return res.send(req.loggedAuthor)
}

export const callBackGoogle = async (req, res) =>{
    //qui facciamo il redirect al front end passandogli il jwt creato in passport nella query string
    res.redirect(`${process.env.FRONTEND_URL}?token=${req.user.jwtToken}`) // token aggiunto da passport, user è l'oggetto di passport
}