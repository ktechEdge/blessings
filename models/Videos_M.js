class Vidoes_m {

    constructor(DB){
        this.DB = DB;
    }

    GetAllVideos = () => this.DB.execute('SELECT * FROM blessing_videos');
    GetVideo = (id) => this.DB.execute('SELECT * FROM blessing_videos WHERE id = ?;', [id]);

    AddVideo = (name, path, abstract) => this.DB.execute(`INSERT INTO blessing_videos(name, path, abstract) VALUES (?, ?, ?);`, [name, path, abstract]);
    
    UpdateVideo = (id, name, abstract) => {
        let sql = 'UPDATE blessing_videos SET ';
        if(typeof name !== 'undefined')
        sql += `name = '${name}', `;
        if(typeof abstract !== 'undefined')
        sql += `abstract = '${abstract}', `;
        sql = sql.slice(0, -2);
        sql +=`WHERE id = '${id}';`;
        return this.DB.execute(sql);
    }

    DeleteVideo = (id) => this.DB.execute(`DELETE FROM blessing_videos WHERE id = ?;`, [id]);
}

module.exports = Vidoes_m;