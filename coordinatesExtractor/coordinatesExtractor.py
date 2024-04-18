
import requests

from exporter.exporterAdresa import ModelAdresa


class CoordinatesExtractor():

    GOOGLE_MAPS_URL : str = ""
    
    def __init__(self) -> None:
        pass

    def extract(self, addressModel : ModelAdresa):
        addressStr = ""
        addressStr += addressModel.ulice + str(addressModel.cisloDomovni)
        if (addressModel.cisloOrientacni is not None):
            addressStr += "/" + addressModel.cisloOrientacni
        addressStr += addressModel.obecNameStr
        print(addressStr)
        #response = requests.get(CoordinatesExtractor.GOOGLE_MAPS_URL + addressStr)

        #responseUrl = response.url