const connection = require('../database/connection');

module.exports = {
  async index(request, response) {
    const contents = await connection('cult_content').join('content', 'cult_content.content_id', '=', 'content.id').select('*');

    return response.json(contents);
  },
  async add(request, response) {
    const { contents } = request.body;
    
    contents.forEach(async function(content_id) {
      await connection('cult_content').insert({
        content_id
      });
    });

    return response.send();
  },
  async remove(request, response) {
    const { id } = request.params;
    await connection('cult_content').where('content_id',id).del();    

    return response.send();
  },
  async removeAll(request, response) {
    await connection('cult_content').del();    

    return response.send();
  }
}