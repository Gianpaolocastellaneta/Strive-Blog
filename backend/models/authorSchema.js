import {model, Schema} from 'mongoose'

const authorSchema = new Schema(
    {
        googleId: String,
        name: {
            type: String,
            required: true,
        },
        surname: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            select: false, // fa in modo che non venga mai selezionata la password        

        },
        avatar: {
            type: String,
        },
        verifiedAt: Date,
        verificationCode: String,
    },
    {collection: "authors", timestamps: true}
)
export default model("Author", authorSchema)