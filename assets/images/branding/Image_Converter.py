import os
import shutil
from PIL import Image

# ---------------- CONFIG ----------------
THUMB_SIZE = (500, 500)
MEDIUM_WIDTH = 1600
QUALITY = 82

SUPPORTED_EXTENSIONS = (".jpg", ".jpeg", ".png", ".tiff", ".bmp")
EXCLUDED_DIRS = {"thumbnails", "medium", "full"}
# ---------------------------------------


BASE_DIR = os.getcwd()


THUMB_DIR = os.path.join(BASE_DIR, "thumbnails")
MEDIUM_DIR = os.path.join(BASE_DIR, "medium")
FULL_DIR = os.path.join(BASE_DIR, "full")


def ensure_dirs():
    os.makedirs(THUMB_DIR, exist_ok=True)
    os.makedirs(MEDIUM_DIR, exist_ok=True)
    os.makedirs(FULL_DIR, exist_ok=True)


def is_valid_image_file(path):
    return (
        os.path.isfile(path)
        and path.lower().endswith(SUPPORTED_EXTENSIONS)
    )


def convert_image(file_path):
    filename = os.path.splitext(os.path.basename(file_path))[0]

    try:
        with Image.open(file_path) as img:
            img = img.convert("RGB")

            # ---------------- MOVE ORIGINAL TO FULL ----------------
            full_dest = os.path.join(FULL_DIR, f"{filename}.webp")

            # Convert original to WebP and save in full folder
            img.save(full_dest, "WEBP", quality=QUALITY, method=6)

            # ---------------- MEDIUM ----------------
            medium_img = img.copy()
            width_percent = MEDIUM_WIDTH / float(medium_img.size[0])

            if width_percent < 1.0:
                new_height = int(medium_img.size[1] * width_percent)
                medium_img = medium_img.resize((MEDIUM_WIDTH, new_height), Image.LANCZOS)

            medium_dest = os.path.join(MEDIUM_DIR, f"{filename}.webp")
            medium_img.save(medium_dest, "WEBP", quality=QUALITY, method=6)

            # ---------------- THUMBNAIL ----------------
            thumb_img = img.copy()
            thumb_img.thumbnail(THUMB_SIZE, Image.LANCZOS)

            thumb_dest = os.path.join(THUMB_DIR, f"{filename}.webp")
            thumb_img.save(thumb_dest, "WEBP", quality=QUALITY, method=6)

            print(f"Processed: {filename}")

    except Exception as e:
        print(f"Failed: {file_path} -> {e}")


def process_folder():
    ensure_dirs()

    for root, dirs, files in os.walk(BASE_DIR):

        # Skip output directories
        dirs[:] = [d for d in dirs if d not in EXCLUDED_DIRS]

        for file in files:
            file_path = os.path.join(root, file)

            if is_valid_image_file(file_path):

                # Skip if already in processed folders
                if any(folder in file_path for folder in EXCLUDED_DIRS):
                    continue

                convert_image(file_path)


if __name__ == "__main__":
    process_folder()
    print("Done processing images.")
