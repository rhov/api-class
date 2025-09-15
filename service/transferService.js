const { transfers } = require('../model/transferModel');
const { users } = require('../model/userModel');

function transfer({ from, to, amount, data = 'transferência realizada com sucesso.' }) {
  const sender = users.find(u => u.username === from);
  const recipient = users.find(u => u.username === to);
  if (!sender || !recipient) throw new Error('Usuário remetente ou destinatário não encontrado.');
  if (from === to) throw new Error('Não é possível transferir para si mesmo.');
  // Verifica se o saldo do remetente é suficiente
  if (sender.balance < amount) {
    throw new Error('Saldo insuficiente para realizar a transferência.');
  }
  // Regra correta: só pode transferir acima de 5000 para quem está na lista de favorecidos do remetente
  if (amount > 5000 && !(Array.isArray(sender.favorecido) && sender.favorecido.includes(to))) {
    throw new Error('Transferências acima de R$ 5.000,00 só podem ser feitas para favorecidos do remetente.');
  }
 // sender.balance -= amount;
 // recipient.balance += amount;
  const transferObj = { from, to, amount, data, date: new Date().toISOString() };
  transfers.push(transferObj);
  return transferObj;
}

function getTransfers() {
  return transfers;
}

module.exports = {
  transfer,
  getTransfers,
};
