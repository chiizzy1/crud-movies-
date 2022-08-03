console.log('connected');
const update = document.querySelectorAll('.update')
const trash = document.querySelectorAll('.delete')

update.forEach(item => item.addEventListener( 'click', ()=>{
    alert('clicked')
    fetch('/movies', {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            likes: 0,
        })
    })
        .then(res => {
            if (res.ok) return res.json()
        })
        .then(response => {
            window.location.reload(true)
        })
}))



trash.forEach(item => item.addEventListener( 'click', ()=>{
    // alert('clicked')
    fetch('/movies', {
        method: 'delete',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: 'title'
        })
    })
        .then(res => {
            if (res.ok) return res.json()
        })
        .then(response => {
            window.location.reload(true)
        })
}))

