//quantity add/subtract
function change_qty(btn, change){
    const num = btn.parentElement.querySelector('.qty-val');
    let qty = parseInt(num.textContent) + change;
    if (qty < 1){
        qty = 1;
    }
    num.textContent = qty;
}

//toggle/close cart
const panel = document.getElementById('cart');

document.getElementById('cart-icon').addEventListener('click', () => {
    panel.classList.add('active');
})

document.getElementById('close').addEventListener('click', () => {
    panel.classList.remove('active');
})


//for the shopping cart items
let total = 0;
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function save_cart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

document.querySelectorAll('.add').forEach(btn => {
    btn.addEventListener('click', () => {
        const qty = parseInt(btn.parentElement.querySelector('.qty-val').textContent, 10);
        add_cart(btn.dataset.id, btn.dataset.name, btn.dataset.price, qty);
        btn.textContent = "Added";
        setTimeout(() => btn.innerHTML = "Add to Cart", 1000);
    })
})

function add_cart(id, name, price, qty){
    const items = cart.find(item => item.id === id);
    if (items) {
        items.qty += qty;
    } else {
        cart.push({id, name, price: parseFloat(price), qty});
    }
    save_cart();
    show_cart();
}

function remove_item(id){
    cart = cart.filter(item => item.id !== id);
    save_cart();
    show_cart();
}

function cart_total(){
    const total = cart.reduce((sum, item) => sum + item.price*item.qty, 0);
    document.getElementById('total').textContent = total.toFixed(2);
}

function show_cart(){
    document.getElementById('cart-items').innerHTML = cart.map(item => `
        <li>
            <span>${item.name} x ${item.qty}</span>
            <span> &#8369;${(item.price * item.qty).toFixed(2)}</span>
            <button onclick="remove_item('${item.id}')" id="close" class="ekis">✕</button>
        </li>
        `).join('');
        cart_total();
}

//buying dialog (final part)
const dialog = document.getElementById('buying');
    
document.getElementById('buy').addEventListener('click', () => {
    const temp = parseFloat(document.getElementById('total').textContent);
    if (temp > 0){
        dialog.showModal();
        cart = [];
        save_cart();
        show_cart();
    }
});

document.getElementById('done').addEventListener('click', () => {
    dialog.close(); 
});


show_cart();