import cv2
import os
import numpy as np

path = 'images\produits'
files = os.listdir(path)

def image_resize(image, width = None, height = None, inter = cv2.INTER_AREA):
    # initialize the dimensions of the image to be resized and
    # grab the image size
    dim = None
    (h, w) = image.shape[:2]

    # if both the width and height are None, then return the
    # original image
    if width is None and height is None:
        return image

    # check to see if the width is None
    if width is None:
        # calculate the ratio of the height and construct the
        # dimensions
        r = height / float(h)
        dim = (int(w * r), height)

    # otherwise, the height is None
    else:
        # calculate the ratio of the width and construct the
        # dimensions
        r = width / float(w)
        dim = (width, int(h * r))

    # resize the image
    resized = cv2.resize(image, dim, interpolation = inter)

    # return the resized image
    return resized

if __name__ == "__main__":
    for f in files:
        print (f)
        img = cv2.imread(os.path.join(path, f), cv2.IMREAD_UNCHANGED)
        (h, w) = img.shape[:2]
        if h > w:
            resized_img = image_resize(img, height=700)
        else: 
            resized_img = image_resize(img, width=700)

        s = max(resized_img.shape[0:2])
        new_img = np.zeros((700,700,img.shape[2]))
        new_img.fill(255)
        ax,ay = (s - resized_img.shape[1])//2,(s - resized_img.shape[0])//2

        #Pasting the 'image' in a centering position
        new_img[ay:resized_img.shape[0]+ay,ax:ax+resized_img.shape[1]] = resized_img
        cv2.imwrite(os.path.join(path, f), new_img)
  