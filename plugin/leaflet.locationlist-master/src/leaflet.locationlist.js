L.Control.LocationList = L.Control.extend({
	
	includes: L.Mixin.Events,
	
	options: {
		position: 'topright',
		showList: true,		
		locationsList : [ {title: 'Pemandian Umbulan', latlng: [-8.177985, 112.766692], zoom: 14},
						  {title: 'Coban Tombhu', latlng: [-8.304046, 112.761478], zoom: 14},
						  {title: 'Coban Kincir', latlng: [-8.303252, 112.762781], zoom: 14},
						  {title: 'Coban Pletes', latlng: [-8.304561, 112.760482], zoom: 14},
						  {title: 'Coban Pandawa', latlng: [-8.310682, 112.784266], zoom: 14},
						  {title: 'Kampung Bunga Grangsil', latlng: [-8.171764, 112.787209], zoom: 14},
						  {title: 'Pemandian Riung Gunung', latlng: [-8.234588, 112.740828], zoom: 14},
						  {title: 'Tubing X-Tempur', latlng: [-8.229642, 112.763371], zoom: 14},
						  {title: 'Waduk Kaliungkal', latlng: [-8.303705, 112.785587], zoom: 14},
						  {title: 'Kampung Banyu River Tubing', latlng: [-8.187270, 112.752146], zoom: 14}],
		nextText : '->',
		nextTitle : 'Next',
		prevText : '<-',
		prevTitle : 'Previous'
	},

	onAdd: function (map) {
	
		if (!this.options.locationsList || this.options.locationsList.length <3) {
			console.log('Too short list! Maybe wrong');			
		}
		
		this._map = map;
		
		var className = 'leaflet-control-locationlist', container;
		
		container = this._contentContainer = L.DomUtil.create('div', className);		
		
		if (!L.Browser.touch) {
			L.DomEvent
				.disableClickPropagation(container)
				.disableScrollPropagation(container);
		} else {
			L.DomEvent.on(container, 'click', L.DomEvent.stopPropagation);
		}
		
		this._currentLocation_index = 0;
				
		arrowsContainer = L.DomUtil.create('div', className + '-arrows leaflet-bar', container);		
		
		this._prevButton = this._createButton(this.options.prevText, this.options.prevTitle,
													className + '-arrow-prev', arrowsContainer, this._switchPrev, this);
													
		this._nextButton = this._createButton(this.options.nextText, this.options.nextTitle, 
													className + '-arrow-next', arrowsContainer, this._switchNext, this);
		
		if (this.options.showList) {
			var form = this._form = L.DomUtil.create('form', className + '-form leaflet-bar');
			this._fullist = L.DomUtil.create('select', className + '-list', form);
			this._fullist.style.width = '100%';			
			
			L.DomEvent		    
			.addListener(this._fullist, 'click', this._onListChange, this);			
			
			container.appendChild(form);
			
			this._update();
		}
		
		return container;
		
    },
	
	_onListChange: function (e) {

		this._currentLocation_index = this._fullist.selectedIndex;
	
		this._map.setView(this.options.locationsList[this._currentLocation_index].latlng, this.options.locationsList[this._currentLocation_index].zoom);
		this.fire('changed');
  },
		
  _createListElement: function (obj,ind) {
		var option = L.DomUtil.create('option');		
		option.innerHTML = obj.title;
		if (this._currentLocation_index == ind ) {
			option.setAttribute('selected', true);
		}
		
		L.DomEvent
		// .addListener(option, 'click', L.DomEvent.stopPropagation)
		//	.addListener(option, 'click', L.DomEvent.preventDefault);
		    .addListener(option, 'click', this._onListChange, this);
		
		return option;
  },
  
  _update: function (e) {		
		// L.DomUtil.empty(this._fullist); add in 0.7.4
		while (this._fullist.firstChild) {
				this._fullist.removeChild(this._fullist.firstChild);
		};	
		var i, obj;
		for (i in this.options.locationsList) {
			obj = this.options.locationsList[i];
			this._fullist.appendChild(this._createListElement(obj,i));
		};
		
		return this;
  },
  
	_createButton: function (text, title, className, container, fn, context) {
		
		var link = L.DomUtil.create('a', className, container);
		link.href = '#';
		link.title = title;	
		link.innerHTML = text;

		L.DomEvent
		    .addListener(link, 'click', L.DomEvent.stopPropagation)
			.addListener(link, 'click', L.DomEvent.preventDefault)
		    .addListener(link, 'click', fn, context);

		return link;
	},
	
	_switchNext: function (e) {	
		if (this._currentLocation_index != this.options.locationsList.length - 1 ) {
			this._currentLocation_index = this._currentLocation_index + 1 ; }
		else {
			 this._currentLocation_index = 0 ;}
			
		this._map.setView(this.options.locationsList[this._currentLocation_index].latlng, this.options.locationsList[this._currentLocation_index].zoom);
		if (this.options.showList) {
			this._update();
		};
		this.fire('changed');
		this.fire('next');
	},
	_switchPrev: function (e) {
		if (this._currentLocation_index != 0) {
			this._currentLocation_index = this._currentLocation_index - 1 ; }
		else {
			this._currentLocation_index = this.options.locationsList.length - 1 ;}
			
		this._map.setView(this.options.locationsList[this._currentLocation_index].latlng, this.options.locationsList[this._currentLocation_index].zoom);
		if (this.options.showList) {
			this._update();
		};
		this.fire('changed');
		this.fire('prev');
	
	}	
		
});



L.control.locationlist = function (options) {
	return new L.Control.LocationList(options);
};
