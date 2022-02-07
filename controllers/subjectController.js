const Subject = require("../models/Subject");

exports.createSubject = async (req, res) => {
    console.log(req.body);
    try {
        let item;
        item = new Subject(req.body);

        await item.save();
        res.send(item);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }

}

exports.getSubjects = async (req, res) => {
    console.log(req.body);
    try {
        console.log("id"+ req.params.id);
        console.log("idplan"+ req.params.planid);
        res.json(req.params.id+req.params.planid)

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }

}

exports.getPlan = async (req, res) => {
    console.log("searching plan");
    console.log(req.body);
    try {
      let plan = await Plan.findById(req.params.id);
      console.log("PLAN ID: " + plan._id);
  
      res.json(plan);
  
      if (!plan) {
        res.status(404).send("No existe el plan");
      }
    } catch (error) {
      console.log(error);
      res.status(500).send("HUbo un error");
    }
  };

exports.getSubject = async (req, res) => {
    console.log("searching Subject");
    console.log(req.body);
    try {
        const item = await Subject.findById(req._id);
        res.json(item)
        if(!item){
            res.status(404).send("No existe ");
        }

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }

}



exports.updateSubject = async (req, res) => {
    console.log(req.body);
    try {
        const { name, year, quarter, subjects, fechaCreacion } = req.body;
        let item = await Subject.findById(req.params.id);

        if (!item) {
            res.status(404).send('No existe el producto');
        }

        item.name = name;
        item.year = year;
        item.quarter = quarter;
        item.subjects = subjects;
        //item.fechaCreacion = fechaCreacion;

        item = await Subject.findOneAndUpdate({ _id: req.params.id }, item, { new: true });

        res.json(item);

    } catch (error) {
        console.log(error);
        res.status(500).send('HUbo un error');
    }

}



exports.deleteSubject = async (req, res) => {

    try {
        let item = await Subject.findById(req.params.id);

        if (!item) {
            res.status(404).json({ msg: 'No existe el producto' })
        }

        await Subject.findOneAndRemove({ _id: req.params.id })
        res.json({ msg: 'Producto eliminado con exito' });

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}










