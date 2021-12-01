import os
import re


def main():
    # Get all markdown files in /posts
    files = [f for f in os.listdir('posts') if f.endswith('.md')]
    # Loop through all files
    for f in files:
        # Open file
        with open('posts/' + f, 'r') as md:
            # Read file
            file = md.read()
            # Find all images
            images = re.findall(r'!\[.*?\]\((.+?)\)', file)
            # Loop through all images
            for image in images:
                # Check if image is in /images
                if not os.path.isfile('images/' + image):
                    # Download image to /public/images/
                    print("Downloading image: " + image)
                    os.system('wget -P public/images/ ' + image)
                    # Replace image with local path
                    file = file.replace(
                        image, 'images/' + image.split('/')[-1])
            # Write file
            with open('posts/' + f, 'w') as md:
                md.write(file)


if __name__ == '__main__':
    main()
