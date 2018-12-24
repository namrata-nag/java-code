package Competitive;
import java.util.*;
public class FloydWarshall {
	void shortestPath(int temp[][],int len){
		int dist[][] = new int[len][len];
		for(int i=0;i<len;i++)
			for(int j=0;j<len;j++){
				dist[i][j]= temp[i][j];
			}
		
		for(int k =0;k<len;k++){
			for(int x =0 ;x<len;x++){
				for(int y =0;y<len;y++){
					if((dist[x][k] + dist[k][y]) < dist[x][y]){
						dist[x][y] = dist[x][k] + dist[k][y];
						
					}
				}
			}
		}
		printPath(dist,len);
	}
	
	void printPath(int dist[][],int len){
		for(int i=0;i<len;i++){
			for(int j=0;j<len;j++){
				System.out.print(dist[i][j] + " ");
			}
			System.out.print( "\n");
		}
			
		System.out.print("Enter array dimension" );	
		
	}
	public static void main(String str[]){
		Scanner s  = new Scanner(System.in);
		int INF = 999999;
		
		
		int dem = s.nextInt();
		int arr[][] = { {0,   5,  INF, 10},
                {INF,  0,  3,  INF},
                {INF, INF, 0,   1},
                {INF, INF, INF, 0} };
		FloydWarshall obj = new FloydWarshall();
		obj.shortestPath(arr,4);
		
		
		
	}
}
