package Competitive;
import java.util.*;
public class BiggestNumberFromArray {
	public static void main(String[] str){
		int[] arr = {7,776,7,7};
		//LinkedList<Integer> arrList = new LinkedList<Integer>();
		ArrayList<String> arrList = new ArrayList<String>();
		//Collections.addAll(arrList, arrList1);
		for(int i =0;i<arr.length;i++){
			arrList.add(Integer.toString(arr[i]));
		}
		/*Collections.sort(arrList, new Comparator<String>(){
			
			public int compare(String a, String b){
				
				return 0;
			}
		});*/
		arrList.sort(new Comparator<String>(){

			public int compare(String arg0, String arg1) {
				// TODO Auto-generated method stub
				String temp1 = arg0 + arg1;
				String temp2 = arg1 +arg0;
				return (temp1.compareTo(temp2)>0)?-1:1;
			}
			
		});
		for(int j=0;j<arr.length;j++){
			System.out.print(arrList.get(j));
		}
	}
}
