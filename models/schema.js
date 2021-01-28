module.exports = {
    tableName: 'users',
    fields: {
      name: { 
        type: 'string',
        required: true,
        minlegth: 5,
        maxlength:50 
      },
      email: { 
        type: 'string',
        required: true,
        minlegth: 5,
        maxlength:255,
        unique: true 
      },
      password: { 
        type: 'string',
        required: true,
        minlegth: 5,
        maxlength: 1024
      },
    }
};