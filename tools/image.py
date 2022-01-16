import os
import re


def imgCleanUp():
    print("🏞 Image Cleaning up")
    # Get all markdown files in /posts
    files = [f for f in os.listdir('posts') if f.endswith('.md')]
    # Loop through all files
    for f in files:
        # Open file
        with open('posts/' + f, 'r') as md:
            print(f)
            # Read file
            file = md.read()
            # Find all images
            md_images = re.findall(r'!\[.*?\]\((.+?)\)', file)
            meta_images = re.findall(r'\bimage: (.*)\b', file)
            print(md_images, meta_images)
            images = md_images + meta_images
            # Loop through all images
            for image in images:
                # Check if image is in /images
                if not os.path.isfile("public" + image):
                    # Download image to /public/images/
                    print("⏬ Downloading image: " + image)
                    os.system('wget -q -P public/images/ ' + image)
                    # Replace image with local path
                    file = file.replace(
                        image, '/images/' + image.split('/')[-1])
                else:
                    print("✅ Cached: " + image)
            # Write file
            with open('posts/' + f, 'w') as md:
                md.write(file)
    print("🍻 Image Cleaning up complete")


if __name__ == '__main__':
    imgCleanUp()
