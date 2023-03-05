from EmbeddingService.UrlConfig import *
import tensorflow_text
import tensorflow_hub as hub
import tensorflow as tf
from transformers import AutoTokenizer, AutoModel, DPRQuestionEncoder, DPRContextEncoder
import os

os.environ["CUDA_VISIBLE_DEVICES"] = '-1'

def load_use_model(require_mode):
    assert require_mode in USE_MODEL_URL.keys(), "mode not found"
    model_dir = os.path.join(os.path.dirname(__file__),"../resources/models", require_mode)
    model = hub.load(model_dir)
    save_model = False
    # if not os.path.exists(model_dir):
    #     model_dir = USE_MODEL_URL[require_mode]
    #     save_model = True
    # model = hub.load(model_dir)
    if save_model:
        tf.saved_model.save(model, f"../resources/models/{require_mode}")
    return model

def load_dpr_model(require_mode):
    assert require_mode in DPR_MODEL_URL.keys(), "mode not found"
    model_dir = f"../resources/models/{require_mode}"
    tokenizer_dir = f"../resources/models/{require_mode}-tokenizer"
    if not os.path.exists(model_dir) and not os.path.exists(tokenizer_dir):
        model_dir = DPR_MODEL_URL[require_mode]
        tokenizer = AutoTokenizer.from_pretrained(model_dir)
        if 'question' in require_mode:
            model = DPRQuestionEncoder.from_pretrained(model_dir)
        elif 'ctx' in require_mode:
            model = DPRContextEncoder.from_pretrained(model_dir)
        else:
            model = AutoModel.from_pretrained(model_dir)
        tokenizer.save_pretrained(tokenizer_dir)
        model.save_pretrained(f"../resources/models/{require_mode}")
    else:
        tokenizer = AutoTokenizer.from_pretrained(tokenizer_dir)
        if 'question' in require_mode:
            model = DPRQuestionEncoder.from_pretrained(model_dir)
        elif 'ctx' in require_mode:
            model = DPRContextEncoder.from_pretrained(model_dir)
        else:
            model = AutoModel.from_pretrained(model_dir)
    return tokenizer, model

def check_all_models():
    mode = "use"
    print(f"Check {mode} model")
    model_dir = f"../resources/models/{mode}"
    if not os.path.exists(model_dir):
        load_use_model(mode)


if __name__ == '__main__':
    load_use_model("use")