namespace Upx.Models.Games.Stairs;

public class StairsGame: IFillArray
{
    private ISetMaxMines _maxMines = new SetMines();

    public bool[][] FillArray()
    {
        bool[][] stairs = new bool[10][];
   
     
    
        for (int i = 0; i < 10; i++)
        {
            stairs[i] = new bool[5];
            for (int j = 0; j < 5; j++)
            {
                stairs[i][j] = true;
         

            }
            stairs = _maxMines.SetMaxMines(stairs, i);
        }
        return stairs;
    }

}