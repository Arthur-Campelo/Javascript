const qs = x => document.querySelector(x)
const qsa = x => document.querySelectorAll(x)

var cart = []
var pizza = ''
var klingon = 1



pizzaJson.map((x, i) => {
    let pizzaItem = qs('.models .pizza-item').cloneNode(true);
    klingon = 1



    //preencher info all pizza
    pizzaItem.setAttribute('data-key', i)
    pizzaItem.querySelector('.pizza-item--img img').src = `${x.img}`
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$: ${x.price.toFixed(2).replace('.', ",")}`
    pizzaItem.querySelector(".pizza-item--name").innerHTML = x.name
    pizzaItem.querySelector(".pizza-item--desc").innerHTML = x.description
    pizzaItem.querySelector('a').addEventListener('click', (e) => {

        //Abrir Area pizza
        e.preventDefault()
        pizza = pizzaItem.getAttribute("data-key")
        let pizzaWindow = qs(".pizzaWindowArea");
        klingon = 1

        pizzaWindow.style.opacity = '0'
        pizzaWindow.style.display = 'flex';
        setTimeout(() => {
            pizzaWindow.style.opacity = '1'
        }, 1)
        qs('.pizzaInfo--size.selected').classList.remove("selected")


        //preencher info pizza
        pizzaWindow.querySelector(".pizzaBig img").src = `${x.img}`
        pizzaWindow.querySelector('.pizzaInfo h1').innerHTML = x.name
        pizzaWindow.querySelector('.pizzaInfo--desc').innerHTML = x.description
        qs(".pizzaInfo--qt").innerHTML = klingon

        /* for(i in x.sizes) { 
            pizzaWindow.querySelectorAll(".pizzaInfo--size")[i].querySelector("span").innerHTML = x.sizes[i]
        } */
        pizzaWindow.querySelectorAll('.pizzaInfo--size').forEach((item, i) => {
            item.querySelector('span').innerHTML = x.sizes[i]
            i === 2 ? item.classList.add('selected') : 1
            /* item.addEventListener('click', ()=> {
                qs('.pizzaInfo--size.selected').classList.remove("selected")
                item.classList.add('selected')
                console.log(item.classList)
            }) */
        })

        // preencher price info
        var priceArea = document.querySelector('.pizzaInfo--pricearea');
        priceArea.querySelector('.pizzaInfo--actualPrice').innerHTML = `RS ${(x.price * klingon).toFixed(2).replace('.', ',')}`
    })

    qs('.pizza-area').append(pizzaItem)
})

//Eventos do modal

//função closeModal
const closeModal = () => {
    qs(".pizzaWindowArea").style.opacity = '0'
    setTimeout(() => {
        qs(".pizzaWindowArea").style.display = 'none'
    }, 200)
}

qs('.pizzaInfo--qtmenos').addEventListener('click', () => {
    klingon--
    if (klingon < 2) klingon = 1
    qs('.pizzaInfo--qt').innerHTML = klingon
})
qs(".pizzaInfo--qtmais").addEventListener("click", () => {
    klingon++
    qs('.pizzaInfo--qt').innerHTML = klingon
})

qsa('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((x) => {
    x.addEventListener('click', closeModal)
})

qsa('.pizzaInfo--size').forEach((item) => {
    item.addEventListener('click', () => {
        qs('.pizzaInfo--size.selected').classList.remove("selected")
        item.classList.add('selected')


    })
})

qs(".pizzaInfo--addButton").addEventListener("click", () => {
    let size = parseInt(qs('.pizzaInfo--size.selected').getAttribute('data-key'))
    let identifier = (pizzaJson[pizza].id).toString() + (size).toString()

    if (cart.length >= 1) {
        var repetido = cart.find((x) => x.identifier == identifier)

        if (repetido) {
            repetido.klingon += klingon
        } else {
            cart.push({ identifier, id: pizzaJson[pizza].id, size, klingon })
        }
    } else {
        cart.push({ identifier, id: pizzaJson[pizza].id, size, klingon })
    }


    updateCart()
    closeModal()
})

qs(".cart--finalizar").addEventListener("click", () => {
    qs('aside').classList.remove('show')
    qs('aside').style.left = '100vw'
    cart.length = 0

    updateCart()
})

function updateCart() {
    var numba = 0
    qs('.menu-openner span').innerHTML = cart.length

    if (cart.length > 0) {
        qs('.cart').innerHTML = ''
        qs('aside').classList.add('show')
        qs('.head').classList.add('shit')
        var p = qs(".stupidText").querySelectorAll('a')
        for (i = 0; i < p.length; i++) {
            p[i].classList.add('shirt')
        }
        qs(".cart").innerHTML = ''

        cart.forEach((item, i) => {
            //console.log(item)

            var pizzaItem = pizzaJson.find((x) => {
                return x.id == item.id
            })
            var pizzaIndexInCart = cart.findIndex((y) => {
                return y.id == item.id
            })

            var cartNode = qs('.cart--item').cloneNode('true')
            qs('.cart').append(cartNode)

            cartNode.querySelector('.cart--item-nome').innerHTML = `<strong>${pizzaItem.name}</strong> | ${item.size == 0 ? "Pequeno" : item.size == 1 ? "Médio" : item.size == 2 ? "Grande" : 1} ${pizzaItem.sizes[item.size]}`
            cartNode.querySelector('img').src = pizzaItem.img
            cartNode.querySelector(".cart--item--qt").innerHTML = item.klingon
            cartNode.querySelector(".cart--item-qtmenos").addEventListener('click', () => {
                item.klingon -= 1
                if (item.klingon < 1) { cart.splice(i, 1) }
                updateCart()
            })
            cartNode.querySelector(".cart--item-qtmais").addEventListener('click', () => {
                item.klingon += 1
                updateCart()
            })

            numba = numba + pizzaJson[item.id - 1].price * item.klingon

            /*  console.log(cartNode)
             console.log(pizzaItem)
             console.log(item)
             console.log(pizzaIndexInCart) 
            console.log("________________________")
            console.log(cart)
            console.log(pizzaIndexInCart)
            console.log(cart[pizzaIndexInCart + 1])
            console.log(i) */
        })

        qs(".subtotal").querySelectorAll('span')[1].innerHTML = `R$ ${((numba.toFixed(2)).toString()).replace('.', ',')}`
        qs(".desconto").querySelectorAll('span')[1].innerHTML = `R$ ${(((numba / 10).toFixed(2)).toString()).replace('.', ',')}`
        qs('.total').querySelectorAll("span")[1].innerHTML = `R$ ${(numba - numba / 10).toFixed(2).toString().replace(".", ',')}`

    } else {
        console.log(qs('aside').classList)
        qs('aside').classList.remove('show')
        qs('aside').style.left = '100vw'
        qs('.head').classList.remove("shit")
        var p = qs(".stupidText").querySelectorAll('a')
        for (i = 0; i < p.length; i++) {
            p[i].classList.remove('shirt')
        }
    }
}

//open cart area on mobile
qs('.menu-openner').addEventListener('click', () => {
    if (cart.length > 0) { qs('aside').style.left = '0' }
})
qs(".menu-closer").addEventListener('click', (x) => {
    qs('aside').style.left = '100vw'
    console.log('s')
})


const colors = ['red', 'blue', 'green', 'purple', 'yellow', 'orange']

var bolo = (Math.random() * 1).toFixed(0)
bolo === 1 ? console.log('ritlarina') : console.log('azerbaijão')

/* for (var i = 0; i < 10; i++) {
    colors.forEach((x) => {
        setInterval(() => {
            qs("body").style.backgroundColor = colors[0]
        }, 100)
        setInterval(() => {
            qs("body").style.backgroundColor = colors[1]
        }, 200)
        setInterval(() => {
            qs("body").style.backgroundColor = colors[2]
        }, 300)
        setInterval(() => {
            qs("body").style.backgroundColor = colors[3]
        }, 400)
        setInterval(() => {
            qs("body").style.backgroundColor = colors[4]
        }, 500)
        setInterval(() => {
            qs("body").style.backgroundColor = colors[5]
        }, 600)


    })
    console.log('hi')
} */
