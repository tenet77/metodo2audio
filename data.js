var trackData = {};

trackData['Alumno1'] = {};
trackData['Alumno2'] = {};
trackData['Cuaderno'] = {};

for (var i=1;i<=31;i++) {
    let id = `${i}`;
    if (i<10) {
        id = `0${i}`;
    };

    trackData['Alumno1'][id] = {
        name: `${id}.mp3`,
        path: `./audio/A2/Alumno1/${id}.mp3`,
    };
    
}

for (var i=1;i<=25;i++) {
    let id = `${i}`;
    if (i<10) {
        id = `0${i}`;
    };

    trackData['Alumno2'][id] = {
        name: `Pista${id}.mp3`,
        path: `./audio/A2/Alumno2/Pista${id}.mp3`,
    };
    
}

for (var i=1;i<=29;i++) {
    let id = `${i}`;
    if (i<10) {
        id = `0${i}`;
    };

    trackData['Cuaderno'][id] = {
        name: `Pista${id}.mp3`,
        path: `./audio/A2/Cuaderno/A2Pista${id}.mp3`,
    };
    
}
