'use strict';

const mongoose = require('mongoose');
const mongooseLeanVirtuals = require('mongoose-lean-virtuals');
const autoIncrement = require('mongoose-auto-increment');
const slug = require('slug');
const _ = require('lodash')
autoIncrement.initialize(mongoose);

let tableSchema = new mongoose.Schema({
    _id: {
        type: Number,
        required: true
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    phoneNumber: {
        type: Number,
    },
    profileImage: {
        type: String
    }
}, {
    timestamps: true
});

tableSchema.plugin(autoIncrement.plugin, {
    model: 'User',
    field: '_id',
    startAt: 1000,
    incrementBy: 1
});


tableSchema.pre('findOneAndUpdate', function (next) {
    const data = this.getUpdate()

    if (_.isEmpty(data.shortDescription) && !_.isEmpty(data.description)) {
        data.shortDescription = data.description.substring(0, 150)
    }

    // if (!_.isEmpty(data.sellingPrice.amount)) {
    //     data.rentalPrice = undefined
    // } else {
    //     data.sellingPrice = undefined
    // }

    if (_.isEmpty(data.slug) && !_.isEmpty(data.title)) {
        // Create unique Ads Slug
        data.slug = slug(data.title) + '-' + this._conditions._id
    }
    this.update({}, data).exec()
    next();
});

/* Define index */
tableSchema.index({'title': 'text'}, {background: true, name: 'titleIndex'});
tableSchema.index( { title: "text", description: "text" }, {background: true, name: 'searchIndex'} )

tableSchema.plugin(mongooseLeanVirtuals);

mongoose.model('User', tableSchema);
