
binSize = 8 ;
magnif = 3 ;
length=1000;
gap = 10201;
dsift_feat=zeros()
for i=1:length
	I = imread('1.jpg');
	I = single(vl_imdown(rgb2gray(I))) ;
	Is = vl_imsmooth(I, sqrt((binSize/magnif)^2 - .25)) ;
	[~, d] = vl_dsift(Is, 'size', binSize) ;
end

f