if (document.readyState == 'loading') {
	document.addEventListener('DOMContentLoaded', ready)
} else {
	ready()
	
}
/* const theme = document.querySelector('#theme');
const themeModal = document.querySelector('.customize-theme');
const fontSizes = document.querySelectorAll('.choose-size span');
var root = document.querySelector(':root');
const colorP = document.querySelectorAll('.choose-color span');
const Bg1 = document.querySelector('.bg-1');
const Bg2 = document.querySelector('.bg-2');
const Bg3 = document.querySelector('.bg-3'); */
function ready() {
	var Remove = document.getElementsByClassName('remove')
	

	for (var i = 0; i < Remove.length; i++) {
		var button = Remove[i]
		button.addEventListener('click',removeItem)
		
	}
	var quantityInput = document.getElementsByClassName('cartQ')
	for (var i = 0; i < quantityInput.length; i++) {
		var input = quantityInput[i]
		input.addEventListener('change',Qchange)
		
	}
	var AddC = document.getElementsByClassName('add')

	for (var i = 0; i < AddC.length; i++) {
		var button = AddC[i]
		button.addEventListener('click', addclicked)
		
	}
	CartTotal()
	api()
	

}

function api (event) {
	fetch('https://fakestoreapi.com/products')
            .then((data)=>{
				return data.json();
			//console.log(data);
			}).then((completedata)=>{
				//console.log(completedata);
				let data1="";
				completedata.map((values)=>{
					data1+=
					`
					<div class="pp">
					<div class="col-auto">
						<div class="card-f" style="width: 150px;">
							<a href="product.html">
								<img src=${values.image} class="card-img-top" alt="..." >
							</a>
							<div class="card-body-f">
								<h5 class="card-title">${values.title}</h5>
								<div class="rating">
									<span><i class="fa fa-star"> </i></span>
									<span><i class="fa fa-star"> </i></span>
									<span><i class="fa fa-star"> </i></span>
									<span><i class="fa-solid fa-star-half-stroke"> </i></span>
									<span><i class="fa-regular fa-star"> </i></span>
								</div>
								<div class="price">
								${values.price}
								</div>
								<div class="action">
									<a href="#" class="btn btn-primary add">ADD TO CHART</a>
								</div>
							</div>
						</div>
					</div>
				</div>
					`
				});
				document.getElementById("pp").innerHTML=data1;
				//console.log(data1);

			}).catch((e)=>{
				console.log(e);
			})
}

function removeItem(event) {
	var buttonClicked = event.target
	buttonClicked.parentElement.parentElement.remove()
	CartTotal()

}

function Qchange(event) {
	var input = event.target
	if (isNaN(input.value) || input.value <= 0) {
		input.value = 1
	}
		CartTotal()
}

function addclicked(event) {
	var button = event.target
	var SHOP = button.parentElement.parentElement.parentElement.parentElement
	var title = SHOP.getElementsByClassName('card-title')[0].innerText
	var price = SHOP.getElementsByClassName('price')[0].innerText
	var imgSrc = SHOP.getElementsByClassName('card-img-top')[0].src
	/* console.log(title, price, imgSrc) */
	addcart(title, price, imgSrc)
	CartTotal()

}

function addcart(title, price, imgSrc){
	var cartRow = document.createElement('tr')
	cartRow.classList.add('cartR')
	var cartItems = document.getElementsByClassName('cartI')[0]
	var cartItemsN = cartItems.getElementsByClassName('cart-title')
	console.log(cartItemsN)

	for (var i = 0; i < cartItemsN.length; i++){
		if (cartItemsN[i].innerText == title){
			alert('This item has already been added')
			return
		}
	}
	var cartRowC = 
	
	`<td>
	<div class="cart-item">
		<img src="${imgSrc}" alt="">

		<div>
			<span><p class="cart-title">${title}</p></span>
			<small>Price: <span class="cartP">${price}</span></small>
			<br>

		</div>
	</div>
</td>
<td><input class="cartQ" type="number" value="1"></td>
<td><a href="#" class="remove">Remove</a></td>`

	cartRow.innerHTML = cartRowC
	cartItems.append(cartRow)
	console.log(cartRow)
	cartRow.getElementsByClassName('remove')[0].addEventListener('click',removeItem)
	cartRow.getElementsByClassName('cartQ')[0].addEventListener('click',Qchange)
	
}

for (var i = 0; i < Remove.length; i++) {
		var button = Remove[i]
		button.addEventListener('click',removeItem)
		
	}
 

	
/* 	function View () {
		var ProductImg = document.getElementById("ProductImg");
		var ViewImg = document.getElementsByClassName("viewImg");
		
		ViewImg[0].onclick = function () {
			ProductImg.src = ViewImg[0].src;
		}
		ViewImg[1].onclick = function () {
			ProductImg.src = ViewImg[1].src;
		}
		ViewImg[2].onclick = function () {
			ProductImg.src = ViewImg[2].src;
		}
		ViewImg[3].onclick = function () {
			ProductImg.src = ViewImg[3].src;
		}
	}
	View ();
	 */



function CartTotal() {
	var CartI = document.getElementsByClassName('cartI')[0]
	var CartR = CartI.getElementsByClassName('cartR')
	var total = 0
	



	for (var i = 0; i < CartR.length; i++) {
		var CartRs = CartR[i]
		var priceElement = CartRs.getElementsByClassName('cartP')[0]
		var quantityElement = CartRs.getElementsByClassName('cartQ')[0]
		var Price = parseFloat(priceElement.innerHTML.replace('$', ''))
		var Quantity = quantityElement.value
	 	/* var a = document.getElementsByClassName('cartPI')[0].innerText
		var b = document.getElementsByClassName('cartPII')[0].innerText
		aa = 7.2
		bb = 10
		var aaa = aa + (aa * Quantity * 0.05)
		var bbb = bb + (bb * Quantity * 0.05) */
		total = total + (Price * Quantity) /*  + (aaa/3) + (bbb/3) */
		 /* console.log(aa)  */
		
		


	} 

	 total = Math.round(total*100)/100
	 /* aaa = Math.round(aaa*100)/100
	 bbb = Math.round(bbb*100)/100 */
	document.getElementsByClassName('cartt')[0].innerText = total
/* 	document.getElementsByClassName('cartPI')[0].innerText = aaa
	document.getElementsByClassName('cartPII')[0].innerText = bbb */

}


/* const openThemeModal = () => {
    themeModal.style.display = 'grid';
}

const closeThemeModal = (e) => {
    if (e.target.classList.contains('customize-theme')) { themeModal.style.display = 'none'; }
}
themeModal.addEventListener('click', closeThemeModal);

theme.addEventListener('click', openThemeModal);

const removeSizeSelector = () => {
    fontSizes.forEach(size => {
        size.classList.remove('active');
    })
}



fontSizes.forEach(size => {


    size.addEventListener('click', () => {

        removeSizeSelector();
        let fontSize;
        size.classList.toggle('active');

        if (size.classList.contains('font-size-1')) {
            fontSize = '60%';
        } else if (size.classList.contains('font-size-2')) {
            fontSize = '80%';
        } else if (size.classList.contains('font-size-3')) {
            fontSize = '100%';
        } else if (size.classList.contains('font-size-4')) {
            fontSize = '120%';
        } else if (size.classList.contains('font-size-5')) {
            fontSize = '140%';
        }
        document.querySelector('html').style.fontSize = fontSize;
    })


})

const removecolorSelector = () => {
    colorP.forEach(color => {
        color.classList.remove('active');
    })
}


colorP.forEach(color => {

    color.addEventListener('click', () => {

        let primary;
        removecolorSelector();

        if (color.classList.contains('color-1')) {
            primaryHue = 252;
        } else if (color.classList.contains('color-2')) {
            primaryHue = 52;
        } else if (color.classList.contains('color-3')) {
            primaryHue = 352;
        } else if (color.classList.contains('color-4')) {
            primaryHue = 152;
        } else if (color.classList.contains('color-5')) {
            primaryHue = 202;
        }
        color.classList.add('active');

        root.style.setProperty('--primary-color-hue', primaryHue);
    })


})

let lightColor;
let whiteColor;
let darkColor;

const changeBG = () => {
    root.style.setProperty('--light-color', lightColor);
    root.style.setProperty('--white-color', whiteColor);
    root.style.setProperty('--dark-color', darkColor);
}
Bg1.addEventListener('click', () => {
  
    Bg1.classList.add('active');

    Bg2.classList.remove('active');
    Bg3.classList.remove('active');
    window.location.reload();
});

Bg2.addEventListener('click', () => {
    darkColor = '95%';
    lightColor = '15%';
    whiteColor = '20%';

    Bg2.classList.add('active');

    Bg1.classList.remove('active');
    Bg3.classList.remove('active');
    changeBG();
});

Bg3.addEventListener('click', () => {
    darkColor = '95%';
    lightColor = '0%';
    whiteColor = '10%';

    Bg3.classList.add('active');

    Bg1.classList.remove('active');
    Bg2.classList.remove('active');
    changeBG();
}) */

