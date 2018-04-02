let orderCount=0;
const takeOrder = (topping, crustType) =>{
  console.log('Order: '+ crustType + ' crust pizza topped with ' + topping);
  console.log(getSubTotal(orderCount))
 
};

const getSubTotal = (itemCount) =>{
  return itemCount * 7.5
};

const getTax = (orderCount) =>{
return  getSubTotal(orderCount) *0.06;
};

const getTotal = () =>{
  return getSubTotal(orderCount) + getTax(orderCount); 
};

takeOrder('bacon','thin')
takeOrder('bacon','thin')
takeOrder('bacon','thin')

console.log(getTotal());