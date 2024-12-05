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
        res.status(201).json(vocab);
    } catch (error) {
        console.error(apiLogger(req), `Error: ${error}`)
        res.status(500).json({
            message : error.message
        })
    }
}

export const find_all_words = async (req, res) => {
    try {
        const { page = 1, offset = 10 } = req.query;

        const skip = (page - 1) * offset;

        const items = await Vocab.find({
            userId: req.user.id
        })
            .skip(Number(skip))
            .limit(Number(offset));

        const totalItems = await Vocab.countDocuments();

        res.json({
            data: items,
            currentPage: Number(page),
            totalPages: Math.ceil(totalItems / 10),
            totalItems,
        });
    } catch (error) {
        console.error(apiLogger(req), `Error: ${error}`)
        res.status(500).json({
            message : error.message
        })
    }
}

export const find_a_word_by_id = async (req, res) => {
    try {
        const word = await Vocab.findOne({ _id : req.params.id, userId : req.user.id })
        console.log(apiLogger(req), `Fetching word ${word}`)
        if (!word) {
            return res.status(404).json({
                message : "No word is found"
            })
        }
        res.status(200).json(word)
    } catch (error) {
        console.error(apiLogger(req), `Error: ${error}`)
        res.status(500).json({
            message : error.message
        })
    }
}

export const update_a_word = async (req, res) => {
    try {
        const updatedWord = await Vocab.updateOne({
            _id : req.params.id,
            userId : req.user.id
        }, req.body, {
            new: true,
            runValidators: true,
        });
        console.log(apiLogger(req), `Updating word...`)

        if (!updatedWord) {
            return res.status(404).json({message: 'Word not found'});
        }

        res.status(200).json(updatedWord);
    } catch (error) {
        console.error(apiLogger(req), `Error: ${error}`)
        res.status(500).json({
            message : error.message
        })
    }
}

export const delete_a_word = async (req, res) => {
    try {

        const deletedWord = await Vocab.findOne({
            _id : req.params.id,
            userId : req.user.id
        })

        if (!deletedWord) {
            return res.status(404).json({message: 'Word not found'});
        }

        await Vocab.deleteOne({
            _id : req.params.id,
            userId : req.user.id
        })
        console.log(apiLogger(req), `Deleting word...`)

        res.status(200).json({
            message : 'Successfully deleted'
        });
    } catch (error) {
        console.error(apiLogger(req), `Error: ${error}`)
        res.status(500).json({
            message : error.message
        })
    }
}