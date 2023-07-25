const transactionModel = require('../models/Transaction');

exports.getTransaction = async (req, res, next) => {
    try {
        const transaction = await transactionModel.find();
        return res.status(200).json({
            success: true,
            count: transaction.length,
            data: transaction,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.addTransaction = async (req, res, next) => {
    try {
        const { userNameCustomId, userName, customId, title, category, type, currency, amount, description } = req.body;
        const transaction = await transactionModel.create({ userNameCustomId, userName, customId, title, category, type, currency, amount, description });
        return res.status(201).json({
            success: true,
            data: transaction
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.deleteTransaction = async (req, res, next) => {
    try {
        // const transaction = await transactionModel.findByIdAndRemove(req.params.idFromFrontEnd);
        const transaction = await transactionModel.findOneAndDelete({ customId: req.params.idFromFrontEnd });

        console.log('req.params.idFromFrontEnd')
        console.log(req.params.idFromFrontEnd)
        console.log('transaction')
        console.log(transaction)
        if (!transaction) {
            return res.status(404).json({
                success: false,
                error: 'No transaction found'
            });
        }
        // await transaction.remove();
        return res.status(200).json({
            success: true,
            data: {}
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};