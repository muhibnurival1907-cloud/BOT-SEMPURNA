const cache = new Map();

function set(chatId,data){

    cache.set(chatId,{

        data,

        created:Date.now()

    });

}

function get(chatId){

    const item=cache.get(chatId);

    if(!item) return null;

    if(Date.now()-item.created>300000){

        cache.delete(chatId);

        return null;

    }

    return item.data;

}

module.exports={

    set,

    get

};