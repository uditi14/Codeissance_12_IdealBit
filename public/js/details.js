document.getElementById('cal').onclick =() => {
    let height = parseInt(document.getElementsByName('height'))
    let weight = parseInt(document.getElementsByName('weight'))

    let ans = weight/(height*height)
    document.getElementById('bmi').innerHTML =  32

}