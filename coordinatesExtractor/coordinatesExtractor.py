
from geopy.geocoders import Nominatim


from exporter.exporterAdresa import ModelAdresa


class CoordinatesExtractor():

    GOOGLE_MAPS_URL : str = ""
    
    def __init__(self) -> None:
        self.geolocator = Nominatim(user_agent="my_geocoder")

    def extract(self, addressModel : ModelAdresa, nazevKraj : str):
        addressStr = ""
        castObce = None
        if(addressModel.ulice is not None):
            addressStr += addressModel.ulice + " "
        elif(addressModel.castObceStr is not None):
            castObce = addressModel.castObceStr
            castObce = castObce.replace("IV", "")
            castObce = castObce.replace("XXX", "")
            castObce = castObce.replace("VI", "")
            castObce = castObce.replace("XI", "")
            castObce = castObce.replace("XV", "")
            castObce = castObce.replace("III", "")
            castObce = castObce.replace("II", "")
            castObce = castObce.replace("České Budějovice 6", "České Budějovice")
            castObce = castObce.replace("České Budějovice 5", "České Budějovice")
            castObce = castObce.replace("České Budějovice 4", "České Budějovice")
            castObce = castObce.replace("České Budějovice 3", "České Budějovice")
            castObce = castObce.replace("České Budějovice 2", "České Budějovice")
            castObce = castObce.replace("České Budějovice 1", "České Budějovice")
            castObce = castObce.replace("Žďár nad Sázavou 3", "Žďár nad Sázavou")
            castObce = castObce.replace(" I", " ")
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