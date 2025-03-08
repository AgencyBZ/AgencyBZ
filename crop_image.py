from PIL import Image
import numpy as np

def trim_whitespace(image_path, output_path, threshold=250):
    # Open the image
    img = Image.open(image_path)
    
    # Convert to numpy array
    img_array = np.array(img)
    
    # Get alpha channel if it exists
    if img_array.shape[2] == 4:
        # Use alpha channel for masking
        mask = img_array[:, :, 3] > 0
    else:
        # Convert to grayscale and threshold
        gray = np.mean(img_array, axis=2)
        mask = gray < threshold
    
    # Find the bounding box
    rows = np.any(mask, axis=1)
    cols = np.any(mask, axis=0)
    ymin, ymax = np.where(rows)[0][[0, -1]]
    xmin, xmax = np.where(cols)[0][[0, -1]]
    
    # Add some padding (10% on each side)
    height, width = ymax - ymin, xmax - xmin
    padding_y = int(height * 0.1)
    padding_x = int(width * 0.1)
    
    ymin = max(0, ymin - padding_y)
    ymax = min(img_array.shape[0], ymax + padding_y)
    xmin = max(0, xmin - padding_x)
    xmax = min(img_array.shape[1], xmax + padding_x)
    
    # Crop the image
    cropped = img.crop((xmin, ymin, xmax, ymax))
    
    # Save the result
    cropped.save(output_path, 'PNG')

# Crop the image
trim_whitespace('images/nicholas.png', 'images/nicholas-cropped.png') 