namespace Upx.Models.Games.Stairs;

public class SetMines : ISetMaxMines
{
    private Random _rnd = new Random();
    public bool[][] SetMaxMines(bool[][] stairs, int i)
    {
        int maxMines = 0;
        switch (i)
        { 
            case var x when x >= 0 && x < 2:
                maxMines = 1;
                break;
            case var x when x >= 2 && x < 5:
                maxMines = 2;
                break;
            case var x when x >= 5 && x<=8:
                maxMines = 3;
                break;
            case var x when x > 8:
                maxMines = 4;
                break;
        }
        for (int j = 0; j < maxMines; j++)
        {
            var number = _rnd.Next(5);
            if (stairs[i][number] == false)
            {
                j--;
            }
            else
            {
                stairs[i][number] = false;
            }
        }

        return stairs;
    }

}