export enum SkolneTypes {
	Zdarma,
	to19k,
	to21k,
	to25k,
	to32k,
	moreThan32k,
}

export enum HodnoceniTypes {
	Hodnoceni0,
	Hodnoceni1,
	Hodnoceni2,
	Hodnoceni3,
	Hodnoceni4,
}

export enum FilterMultiSelectWrapperType {
	//Basic options, only one is active at a time
	//kraj table, take nazev
	Kraj,
	//obec table, take nazev
	Mesto,
	//okres table,   take nazev
	Okres,
	//mestska_cast table, take nazev
	MestskaCast,

	//Advanced options, where all are active at the same time
	// Obor table, filter by kod, but take name
	VyucovaneObory,
	//typ_skoly db enum
	TypSkoly,
	PrijmaciZkousky,
	//SkolneTypes enum
	Skolne,
	//HodnoceniTypes enum
	Hodnoceni,
}
