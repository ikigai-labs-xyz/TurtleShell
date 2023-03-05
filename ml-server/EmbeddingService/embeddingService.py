from EmbeddingService.modelUtils import *


class USEService(object):
    def __init__(self, mode):
        self.mode = mode
        self.model = load_use_model(mode)

    def embedding(self, instances):
        embeddings = self.model(instances)
        return embeddings.numpy().tolist()


class TextEmbeddingService(object):
    def __init__(self, require_mode="use"):
        check_all_models()
        if "use" in require_mode:
            self.embeddingService = USEService("use")
        else:
            raise Exception("mode not found")

    def embedding(self, instances):
        return self.embeddingService.embedding(instances)


if __name__ == '__main__':
    tes = TextEmbeddingService()
