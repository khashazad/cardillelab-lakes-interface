from abc import ABC, abstractmethod


class ParsingStrategy(ABC):
    @abstractmethod
    def extract_image_record(self, observation):
        pass

    @abstractmethod
    def extract_record(self, observation):
        pass
