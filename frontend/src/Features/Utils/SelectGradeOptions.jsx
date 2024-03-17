export default function SelectGradeOptions(){

    
        const versionOptions = [];
        for (let i = 1; i <= 17; i++) {
            versionOptions.push(<option key={`v${i}`} value={`v${i}`}>v{i}</option>);
        }
   
        return versionOptions
   
}