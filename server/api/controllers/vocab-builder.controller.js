import Vocab from '../models/vocab-builder.model.js'
import {apiLogger} from "../logger/logger.js";

export const ping = async (req, res) => {
    res.status(200).send("The server works ok")
}

export const create_a_word = async (req, res) => {
    try {
        const { english, german } = req.body

        const vocabExisted = await Vocab.findOne({ english })

        if (vocabExisted) {
            return res.status(409).json({
                message : `Existed word ${english}`
            })
        }

        const vocab = new Vocab({
            english : english,
            german : german,
            userId : req.user.id
        })

        console.log(apiLogger(req), `Attempting to save new vocab\n`, vocab)
        await vocab.save()
        res.status(200).json(vocab);
    } catch (error) {
        console.log(apiLogger(req), `Error: ${error}`)
        res.status(500).json({
            message : error.message
        })
    }
}
