//Inicializador del elemento Slider
$("#rangoPrecio").ionRangeSlider({
  type: "double",
  grid: false,
  min: 0,
  max: 100000,
  from: 1000,
  to: 20000,
  prefix: "$"
})

function setSearch() {
  let busqueda = $('#checkPersonalizada')
  busqueda.on('change', (e) => {
    if (busqueda.customSearch == false) {
      busqueda.customSearch = true
    } else {
      busqueda.customSearch = false
    }
    $('#personalizada').toggleClass('invisible')
  })
}

setSearch();

class EventManager{
  constructor() {
    this.urlBase = "/events"
    this.response = ""
    this.getAllData()
    this.getAllDataCiudad()
    this.getAllDataTipo()
    this.lookAll()
  }

  lookAll() {
    let self = this;
    $('#buscar').on('click', () => {
      self.renderData(self.response)
    })
  }

  getAllData() {
    let self = this;
    let url = self.urlBase + '/all'
    $.get(url, (response) => {
      this.response = response
    })
  }

  getAllDataCiudad(){
    let url = this.urlBase + '/allCiudad'
    $.get(url, (response) => {
      this.renderDataCiudad(response)
    })
  }

  getAllDataTipo(){
    let url = this.urlBase + '/allTipo'
    $.get(url, (response) => {
      this.renderDataTipo(response)
    })
  }

  filterData(data){
    if($('#ciudad').val()=='' && $('#tipo').val()==''){
      return parseFloat(data.Precio.substring(1).replace(",",'')) >= parseFloat($('.irs-from').text().substring(1).replace(" ","")) &&
            parseFloat(data.Precio.substring(1).replace(",",'')) <= parseFloat($('.irs-to').text().substring(1).replace(" ",""))
    }else if($('#ciudad').val()!='' && $('#tipo').val()!=''){
      return data.Ciudad === $('#ciudad option:selected').text() &&
            data.Tipo === $('#tipo option:selected').text() &&
            parseFloat(data.Precio.substring(1).replace(",",'')) >= parseFloat($('.irs-from').text().substring(1).replace(" ","")) &&
            parseFloat(data.Precio.substring(1).replace(",",'')) <= parseFloat($('.irs-to').text().substring(1).replace(" ",""))
    }else if($('#ciudad').val()!='' && $('#tipo').val()==''){
      return data.Ciudad === $('#ciudad option:selected').text() &&
            parseFloat(data.Precio.substring(1).replace(",",'')) >= parseFloat($('.irs-from').text().substring(1).replace(" ","")) &&
            parseFloat(data.Precio.substring(1).replace(",",'')) <= parseFloat($('.irs-to').text().substring(1).replace(" ",""))
    }else if($('#ciudad').val()=='' && $('#tipo').val()!=''){
      return data.Tipo === $('#tipo option:selected').text() &&
            parseFloat(data.Precio.substring(1).replace(",",'')) >= parseFloat($('.irs-from').text().substring(1).replace(" ","")) &&
            parseFloat(data.Precio.substring(1).replace(",",'')) <= parseFloat($('.irs-to').text().substring(1).replace(" ",""))
    }
  }

  renderData(response){
    let obj = JSON.parse(response)
    if($('#personalizada').attr('class')!='row invisible'){
      obj = obj.filter(this.filterData)
    }
    let template = '<div class="card horizontal">' +
                      '<div class="card-image">' +
                        '<img src="img/home.jpg">' +
                      '</div>' +
                      '<div class="card-stacked">' +
                        '<div class="card-content">' +
                          '<div><b>Direccion: </b>:direccion:</div>' +
                          '<div><b>Ciudad: </b>:ciudad:</div>' +
                          '<div><b>Telefono: </b>:telefono:</div>' +
                          '<div><b>Código postal: </b>:postal:</div>' +
                          '<div><b>Precio: </b>:precio:</div>' +
                          '<div><b>Tipo: </b>:tipo:</div>' +
                        '</div>' +
                      '</div>' +
                    '</div>'
    $('#lista').html('')
    obj.map((data) => {
      let nuevo = template.replace(':direccion:', data.Direccion)
                          .replace(':ciudad:', data.Ciudad)
                          .replace(':telefono:', data.Telefono)
                          .replace(':postal:', data.Codigo_Postal)
                          .replace(':precio:', data.Precio)
                          .replace(':tipo:', data.Tipo)
      $('#lista').append(nuevo)
    })
  }

  renderDataCiudad(response){
    let obj = JSON.parse(response)
    obj.map((data)=>{
      $('#ciudad').append('<option value="'+data.Id+'">'+data.Name+'</option>')
    })
    $('#ciudad').css('display', 'block')
  }

  renderDataTipo(response){
    let obj = JSON.parse(response)
    obj.map((data)=>{
      $('#tipo').append('<option value="'+data.Id+'">'+data.Name+'</option>')
    })
    $('#tipo').css('display', 'block')
  }
}
const Manager = new EventManager;
