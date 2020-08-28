// Use this hook to manipulate incoming or outgoing data.


module.exports = (options = {}) =>{
return async context =>{

  context.data.availability= 'False',
  context.data.actioned='Not Yet'

  return context 
};
};