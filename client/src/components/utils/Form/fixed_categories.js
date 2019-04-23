const sizes = [
  {
    _id: 20,
    name: "Daily"
  },
  {
    _id: 21,
    name: "Weekly"
  },
  {
    _id: 22,
    name: "Monthly"
  }
];

const price = [
  {
    _id: 0,
    name: "Any",
    array: []
  },
  {
    _id: 1,
    name: "$0 to $5",
    array: [0, 5]
  },
  {
    _id: 2,
    name: "$6 to $9",
    array: [6, 9]
  },
  {
    _id: 3,
    name: "$10 to $15",
    array: [10, 15]
  },
  {
    _id: 4,
    name: "$16 to $19",
    array: [16, 19]
  },
  {
    _id: 5,
    name: "More than $20",
    array: [20, 100000]
  }
];

export { sizes, price };
