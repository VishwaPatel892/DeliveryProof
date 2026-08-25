// data/deliveries.js
//
// DUMMY DELIVERY DATA — Part 2
//
// This file exports an array of delivery objects.
// Each object represents one delivery assigned to the delivery partner.
//
// WHY AN ARRAY?
// - An array lets us use FlatList (which needs an array as `data`).
// - We can use .filter() and .length to calculate statistics.
//
// STATUSES USED:
//   Pending    → Order is assigned but not yet picked up
//   Picked Up  → Partner has collected the package
//   On the Way → Package is being transported
//   Arrived    → Partner has reached the delivery location
//   Delivered  → Package successfully handed over
//   Failed     → Delivery could not be completed

const deliveries = [
  {
    id: '1',
    orderId: 'DP1024',
    customerName: 'Rahul Sharma',
    phone: '9876543210',
    address: '12, Sunrise Apartments, Satellite',
    area: 'Satellite',
    items: '2 Packages',
    status: 'Pending',
  },
  {
    id: '2',
    orderId: 'DP1025',
    customerName: 'Priya Patel',
    phone: '9876543211',
    address: '45, Green Valley Society, Navrangpura',
    area: 'Navrangpura',
    items: '1 Package',
    status: 'On the Way',
  },
  {
    id: '3',
    orderId: 'DP1026',
    customerName: 'Amit Desai',
    phone: '9876543212',
    address: '89, Blue Horizon Complex, Chandkheda',
    area: 'Chandkheda',
    items: '3 Packages',
    status: 'Delivered',
  },
  {
    id: '4',
    orderId: 'DP1027',
    customerName: 'Neha Joshi',
    phone: '9876543213',
    address: 'B-201, Royal Enclave, Bopal',
    area: 'Bopal',
    items: '1 Package',
    status: 'Picked Up',
  },
  {
    id: '5',
    orderId: 'DP1028',
    customerName: 'Vikram Mehta',
    phone: '9876543214',
    address: '10, Platinum Plaza, Vastrapur',
    area: 'Vastrapur',
    items: '2 Packages',
    status: 'Failed',
  },
  {
    id: '6',
    orderId: 'DP1029',
    customerName: 'Sneha Rathod',
    phone: '9876543215',
    address: 'C-5, Shyamal Row Houses, Maninagar',
    area: 'Maninagar',
    items: '1 Package',
    status: 'Arrived',
  },
];

export default deliveries;
