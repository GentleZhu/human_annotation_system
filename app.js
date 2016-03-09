var express=require('express');
var fs=require('fs');
var readline=require('readline');
var bodyParser = require('body-parser');
var app=express();
var exec = require('child_process').execSync;
//app.use(express.static(__dirname+'/public'));
app.set('view engine', 'jade');
app.set('views', './views')
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json()); // to support JSON bodies
app.use(bodyParser.urlencoded({ extended: true }));

var attribute_dataset=['baldhead','darkhair','eyesopen','goodlooking','masculinelooking','mouthopen','smile','vforehead','v_teeth','young'];
var attribute_amount=[500,500,500,500,500,500,500,500,500,500];
app.get('/', function(req,res){
	//var pageNum=0
	//var pair=line_data[pageNum].split(' ');
	//if (pair.length!=2)
	//	console.log("File error");
	res.render('index');
	//res.render('/index.html',{userid: '2333'});
});

function load_data () {
	var train_pair=new Array();
	for (var i = attribute_dataset.length - 1; i >= 0; i--) {
		var data=fs.readFileSync('./public/train/'+attribute_dataset[i],'utf-8');
		var line_data=data.split('\n');
		train_pair[attribute_dataset[i]]=line_data;
		//console.log(train_pair[attribute_dataset[i]].length);
	};
	
	return train_pair;
}

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

train_pair=load_data();
//console.log(train_pair)
app.post('/login', function(req,res){
	var dirname='./annotation/'+req.body.InputName;
	var folder_exist=fs.existsSync(dirname);
	var attribute_progress=[0,0,0,0,0,0,0,0,0,0];
	var output;
	//console.log(dirname);
	if(folder_exist == true){
		//console.log(dirname);
		for (var i=0;i<attribute_dataset.length;i++){
			var exists=fs.existsSync(dirname+'/LFW10_'+attribute_dataset[i]);
			if (exists == true){
					//console.log('wc  '+dirname+'/'+attribute_dataset[i]);
			    	output=exec('wc  -l '+dirname.replaceAll(' ','\\ ')+'/LFW10_'+attribute_dataset[i], {encoding:'utf-8'});
			    	//console.log(output)
			    	var cut=output.split(' ');
			    	attribute_progress[i]=cut[0];
			}
		}
	}
	else{
		//console.log('./annotation/'+req.body.InputName)
		fs.mkdirSync(dirname);
	}
	res.render('annotate_progress',{username:req.body.InputName,progress:attribute_progress,amount:attribute_amount});
	//res.render('/index.html',{userid: '2333'});
});

app.get('/load',function (req,res) {
	res.render('index');
});

app.post('/load',function (req,res) {
	//console.log(req.body)
	//console.log(req.params)
	var pageNum=parseInt(req.body.page);
	var pair=train_pair[req.body.attr][pageNum].split(' ');
	//console.log(pair)
	if (pair.length!=3)
		console.log("File error");
	//res.render('annotation')
	//res.render('index')
	//res.redirect('index')
	res.render('annotation',{params:req.body,imageA:pair[0],imageB:pair[1],page:pageNum+1})
	//console.log("done")
	//console.log(req.params.user);
	//console.log(req.params.dat);
	//console.log(req.params.attr);
});

app.post('/:user/:dat/:attr&page:id',function (req,res) {
	var pageNum=parseInt(req.params.id);
	var dirname='./annotation/'+req.params.user+'/'+req.params.dat+'_'+req.params.attr;
	var pair=train_pair[req.params.attr][pageNum].split(' ');
	if (pair.length!=3)
		console.log("File error");
	var data=req.body.optionsRadios+" "+req.body.coordinateL+" "+req.body.coordinateR+"\n"
	fs.appendFile(dirname ,data , function (err) {
		if (err) throw err;
	});
	if (pageNum<attribute_amount[attribute_dataset.indexOf(req.params.attr)])
		res.render('annotation',{params:req.params,imageA:pair[0],imageB:pair[1],page:pageNum+1});
	else
		res.render('index');
	//res.render('index',)
});
app.listen(8080, function(){
	console.log('Running on port 8080!');
});