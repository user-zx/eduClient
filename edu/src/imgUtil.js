/**
 * Created by user on 2017/4/25.
 */

exports.install = function (Vue, options) {
    /**
     * 按照宽高比例压缩图片
     * @param canvas
     * @param originalImg
     * @param containerWidth
     * @param containerHeight
     * @param quality
     * @returns {*}
     */
    Vue.prototype.$compressImg = function (canvas, originalImg, containerWidth, containerHeight, quality) {
        if(!originalImg){
            return false;
        }

        let oWidth = originalImg.width, oHeight = originalImg.height;

        containerWidth = containerWidth || 100;
        containerHeight = containerHeight || 100;
        quality = quality || 0.5;
        
        let compressWidth, compressHeight;

        if(oWidth / containerWidth >= oHeight / containerHeight){
            compressWidth = containerWidth;
            compressHeight = oHeight / (oWidth / containerWidth);
        }else {
            compressHeight = containerHeight;
            compressWidth = oWidth / (oHeight / containerHeight);
        }

        canvas.width = compressWidth;
        canvas.height = compressHeight;
        // canvas.


        let context = canvas.getContext('2d');
        context.drawImage(originalImg, 0, 0, oWidth, oHeight, 0, 0, compressWidth, compressHeight);
        let dataUrl = canvas.toDataURL('image/jpeg', quality);
        return dataUrl;
    }
}


