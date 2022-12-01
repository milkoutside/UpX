using Upx.Models.Games.Stairs;

namespace Upx.Service.Stairs;

public class StairsServices
{
    private readonly StairsGame _stairsGame = new StairsGame();

    public bool[][] GetStairs()
    {
        return  _stairsGame.FillArray();
    }


}