






const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message1')
const message2 = document.querySelector('#message2')


weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    message1.textContent = 'Loading.....'
    message2.textContent = ''
    
    fetch('http://localhost:3003/weather?address='+search.value).then((response)=>{
    response.json().then((res)=>{
        if(res.error){
            // console.log(data.error)
            message1.textContent = ''
            message2.textContent= res.error
            
        }else{
            // console.log(data)
            message1.textContent = ''
            message2.textContent = res.data
        }
    })
})
})