
from geopy.geocoders import Nominatim


from exporter.exporterAdresa import ModelAdresa


class CoordinatesExtractor():
    """
    Provides interface for extracting coordinates from addresses
    """

    GOOGLE_MAPS_URL : str = ""
    
    def __init__(self) -> None:
        self.geolocator = Nominatim(user_agent="my_geocoder")

    def extract(self, addressModel : ModelAdresa, nazevKraj : str):
        """
        Extract coordinates (latitude, longitude) from given address model
        Args:
            addressModel: address to extract
            nazevKraj: name of the kraj to help algorithm to detect city to extract (if more cities with the same name)
        Returns:
            latitude : float, longitude : float
        """
        addressStr = ""
        castObce = None
        if(addressModel.ulice is not None):
            addressStr += addressModel.ulice + " "
        elif(addressModel.castObceStr is not None):
            castObce = addressModel.castObceStr
            castObce = castObce.replace("Pardubice IV", "Pardubice")
            castObce = castObce.replace("Pardubice VII", "Pardubice")
            castObce = castObce.replace("Pardubice VI", "Pardubice")
            castObce = castObce.replace("Pardubice V", "Pardubice")
            castObce = castObce.replace("Pardubice I", "Pardubice")
            castObce = castObce.replace("Pardubice VIII", "Pardubice")
            castObce = castObce.replace("Pardubice III", "Pardubice")
            castObce = castObce.replace("Pardubice II", "Pardubice")
            castObce = castObce.replace("Plzeň 9-Malesice", "Plzeň Malesice")
            castObce = castObce.replace("Plzeň 10-Lhota", "Plzeň Lhota")
            castObce = castObce.replace("Plzeň 8-Černice", "Plzeň Černice")
            castObce = castObce.replace("Plzeň 7-Radčice", "Plzeň Radčice")
            castObce = castObce.replace("Plzeň 6-Litice", "Plzeň Litice")
            castObce = castObce.replace("Plzeň 5-Křimice", "Plzeň Křimice")
            castObce = castObce.replace("Plzeň 2-Slovany", "Plzeň Slovany")
            castObce = castObce.replace("Plzeň 1", "Plzeň")
            castObce = castObce.replace("Plzeň 3", "Plzeň")
            castObce = castObce.replace("Plzeň 4", "Plzeň")
            castObce = castObce.replace("České Budějovice 6", "České Budějovice")
            castObce = castObce.replace("České Budějovice 5", "České Budějovice")
            castObce = castObce.replace("České Budějovice 4", "České Budějovice")
            castObce = castObce.replace("České Budějovice 3", "České Budějovice")
            castObce = castObce.replace("České Budějovice 2", "České Budějovice")
            castObce = castObce.replace("České Budějovice 1", "České Budějovice")
            castObce = castObce.replace("Žďár nad Sázavou 3", "Žďár nad Sázavou")
            addressStr += castObce + " "

        if(addressModel.cisloDomovni is not None):
            addressStr += str(addressModel.cisloDomovni)
        if (addressModel.cisloOrientacni is not None):
            addressStr += "/" + addressModel.cisloOrientacni

        if(addressModel.obecNameStr is not None):
            if(castObce is None or castObce.find(addressModel.obecNameStr) == -1):
                addressStr += " " + addressModel.obecNameStr
        #print("psc=", addressModel.psc)
        #print("kodAdresnihoMista=",addressModel.kodAdresnihoMista)

        print(addressStr)

        location = self.geolocator.geocode(addressStr, language="cs")
        print(location.latitude, location.longitude)
        return location.latitude, location.longitude