import Vocab from '../models/vocab-builder.model.js'
import {apiLogger} from "../logger/logger.js";

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
        console.error(apiLogger(req), `Error: ${error}`)
        res.status(500).json({
            message : error.message
        })
    }
}

export const find_all_words = async (req, res) => {
    try {
        const words = await Vocab.find({ userId : req.user.id })
        console.log(apiLogger(req), "Fetching words...")
        res.status(200).json(words.map(word => {
            return {
                english : word.english,
                german : word.german
            }
        }))
    } catch (error) {
        console.error(apiLogger(req), `Error: ${error}`)
        res.status(500).json({
            message : error.message
        })
    }
}
