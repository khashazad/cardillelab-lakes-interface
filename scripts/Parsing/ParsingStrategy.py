from abc import ABC, abstractmethod
from typing import Dict, Any


class ParsingStrategy(ABC):
    @abstractmethod
    def extract_image_record(self, observation) -> Dict[str, Any]:
        pass

    @abstractmethod
    def extract_record(self, observation) -> Dict[str, Any]:
        return dict
