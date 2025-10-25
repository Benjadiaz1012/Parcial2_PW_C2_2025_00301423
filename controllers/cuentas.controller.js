const cuentas = [
  {
    "_id": "68fc16343ba6dcdf01fe4839",
    "index": 0,
    "guid": "0731ba44-37c9-444f-907a-552968418224",
    "isActive": true,
    "balance": "$3,067.37",
    "picture": "http://placehold.it/32x32",
    "age": 20,
    "eyeColor": "green",
    "name": "Myra Valdez",
    "gender": "female",
    "company": "GOLISTIC",
    "email": "myravaldez@golistic.com",
    "phone": "+1 (890) 419-3150",
    "address": "203 Empire Boulevard, Saranap, Colorado, 5021",
    "registered": "2025-02-20T05:11:56 +06:00",
    "isActive": true
  },
  {
    "_id": "68fc163439eff902eabd704c",
    "index": 1,
    "guid": "528d7474-4670-4d23-8ca2-5512cab4be98",
    "isActive": false,
    "balance": "$3,862.30",
    "name": "Lang Mcdonald",
    "gender": "male",
    "company": "RODEOCEAN",
    "email": "langmcdonald@rodeocean.com"
  },
  {
    "_id": "68fc16345fae70a62fd9e3a3",
    "index": 2,
    "guid": "d46fe94a-6567-4ca9-b184-3fec1b97c8c9",
    "isActive": false,
    "balance": "$3,822.22",
    "name": "Mosley Sharp",
    "gender": "male",
    "company": "COMTOURS",
    "email": "mosleysharp@comtours.com"
  },
  {
    "_id": "68fc163465ec522ca00e1266",
    "index": 3,
    "guid": "8b85c37e-6ae1-41f2-aaea-a735e42c53a9",
    "isActive": false,
    "balance": "$1,570.43",
    "name": "Pam Graves",
    "gender": "female",
    "company": "TUBESYS",
    "email": "pamgraves@tubesys.com"
  },
  {
    "_id": "68fc1634c44d8c3361feb64e",
    "index": 4,
    "guid": "e4871663-50ac-410a-93ec-7eb08e626e1f",
    "isActive": false,
    "balance": "$1,707.87",
    "name": "Sylvia Hatfield",
    "gender": "female",
    "company": "ZBOO",
    "email": "sylviahatfield@zboo.com"
  }
];

export const getCuentas = (req, res) => {
  res.json({
    count: cuentas.length,
    data: cuentas
  });
};


export const getCuentaById = (req, res) => {
  const id = req.params.id;
  const cuenta = cuentas.find(c => c._id === id);

  res.json({
    finded: !!cuenta,
    account: cuenta || null
  });
};

export const getCuentaByQuery = (req, res) => {
  const query = req.query.queryParam?.toLowerCase();
  if (!query)
    return res.json({ finded: false, message: "Debe enviar un parámetro de consulta" });

  const resultado = cuentas.filter(
    c =>
      c._id.toLowerCase() === query ||
      c.name.toLowerCase().includes(query) ||
      c.gender.toLowerCase() === query
  );

  if (resultado.length === 0) {
    res.json({ finded: false });
  } else if (resultado.length === 1) {
    res.json({ finded: true, account: resultado[0] });
  } else {
    res.json({ finded: true, data: resultado });
  }
};

export const getCuentasBalance = (req, res) => {
  const activas = cuentas.filter(c => c.isActive);
  const totalBalance = activas.reduce((sum, c) => {
    const monto = parseFloat(c.balance.replace(/[^0-9.-]+/g, ""));
    return sum + monto;
  }, 0);

  res.json({
    status: activas.length > 0,
    accountBalance: totalBalance.toFixed(2)
  });
};