console.log('connected');
let thumbUp  =  [...document.querySelectorAll('.fa-thumbs-up')]; 
console.log(thumbUp);

let trash = [...document.querySelectorAll('.fa-trash')];
console.log(trash);

thumbUp.forEach(item => item.addEventListener( 'click', ()=>{
    const title = this.parentNode.parentNode.childNodes[1].innerText
    const genre = this.parentNode.parentNode.childNodes[3].innerText
    const year = this.parentNode.parentNode.childNodes[5].innerText
    const thumbUp = parseFloat(this.parentNode.parentNode.childNodes[7].innerText)
    
    fetch('/movies', {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            'title': title,
            'genre': genre,
            'year': year,
            'thumbUp': thumbUp
        })
    })
        .then(res => {
            if (res.ok) return res.json()
        })
        .then(data => {
            console.log(data)
            window.location.reload(true)
        })
}))



trash.forEach(item => item.addEventListener( 'click', ()=>{
    // alert('clicked')
    const title = this.parentNode.parentNode.childNodes[1].innerText
    const genre = this.parentNode.parentNode.childNodes[3].innerText
    fetch('/movies', {
        method: 'delete',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            'title': title,
            'genre': genre
        })
    })
        .then(res => {
            if (res.ok) return res.json()
        })
        .then(data => {
            console.log(data);
            window.location.reload(true)
        })
}))

